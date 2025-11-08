'use client';

import { useState, useEffect } from 'react';
import FileExplorer from '@/components/seo-audit/FileExplorer';
import SEOAuditPanel from '@/components/seo-audit/SEOAuditPanel';
import { Loader2 } from 'lucide-react';

export default function SEOOptizPage() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [scanErrors, setScanErrors] = useState([]);

  useEffect(() => {
    // Security check - only allow in development
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      const host = window.location.host;
      if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
        window.location.href = '/';
        return;
      }
    }

    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      
      const response = await fetch('/api/seo-optiz/files');
      
      if (!response.ok) {
        let errorPayload;
        try {
          errorPayload = await response.json();
        } catch (e) {
          errorPayload = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const errorMessage = errorPayload.error || errorPayload.details || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          payload: errorPayload
        });
        
        // Even if there's an error, try to use any files that were returned
        if (errorPayload.files && Array.isArray(errorPayload.files) && errorPayload.files.length > 0) {
          console.warn('API returned error but some files were loaded:', errorPayload.files.length);
          setFiles(errorPayload.files);
          setScanErrors(errorPayload.errors || []);
          setLoadError(`Warning: ${errorMessage} (but ${errorPayload.files.length} files loaded)`);
          if (errorPayload.files.length > 0) {
            selectFile(errorPayload.files[0]);
          }
          setLoading(false);
          return;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      const fileList = Array.isArray(data) ? data : (data.files || []);
      const errors = Array.isArray(data?.errors) ? data.errors : [];

      console.log(`Loaded ${fileList.length} files${errors.length > 0 ? ` with ${errors.length} scan errors` : ''}`);

      setFiles(fileList);
      setScanErrors(errors);
      setLoadError(null);

      if (fileList.length > 0) {
        selectFile(fileList[0]);
      } else {
        setSelectedFile(null);
        setFileData(null);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      setLoadError(error.message || 'Failed to load files');
      setFiles([]);
      setSelectedFile(null);
      setFileData(null);
    } finally {
      setLoading(false);
    }
  };

  const selectFile = async (file) => {
    if (!file) {
      setSelectedFile(null);
      setFileData(null);
      setLoadingFile(false);
      return;
    }

    setSelectedFile(file);
    setLoadingFile(true);
    try {
      const response = await fetch(`/api/seo-optiz/${file.slug}`);
      if (!response.ok) throw new Error('Failed to load file');
      const data = await response.json();
      setFileData(data);
    } catch (error) {
      console.error('Error loading file:', error);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleSave = () => {
    // Reload files and current file data after save
    loadFiles();
    if (selectedFile) {
      setTimeout(() => {
        selectFile(selectedFile);
      }, 500);
    }
  };

  const currentIndex = files.findIndex(f => f.slug === selectedFile?.slug);
  const hasNext = currentIndex >= 0 && currentIndex < files.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      selectFile(files[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      selectFile(files[currentIndex - 1]);
    }
  };

  // Calculate overall statistics
  const stats = {
    total: files.length,
    withIssues: files.filter(f => f.hasIssues).length,
    withWarnings: files.filter(f => f.hasWarnings && !f.hasIssues).length,
    perfect: files.filter(f => !f.hasIssues && !f.hasWarnings).length,
    missingTitle: files.filter(f => f.issues?.includes('missing-title')).length,
    missingExcerpt: files.filter(f => f.issues?.includes('missing-excerpt')).length,
    titleTooShort: files.filter(f => f.issues?.includes('title-too-short')).length,
    titleTooLong: files.filter(f => f.issues?.includes('title-too-long')).length,
    excerptTooShort: files.filter(f => f.issues?.includes('excerpt-too-short')).length,
    excerptTooLong: files.filter(f => f.issues?.includes('excerpt-too-long')).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (loadError && files.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Failed to Load Files</h2>
          <p className="text-gray-700 mb-4">{loadError}</p>
          <button
            onClick={() => {
              setLoading(true);
              setLoadError(null);
              loadFiles();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Check the browser console for more details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Summary Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-sm font-medium text-gray-700">Total: </span>
              <span className="text-sm font-bold text-gray-900">{stats.total}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-red-600">Issues: </span>
              <span className="text-sm font-bold text-red-600">{stats.withIssues}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-yellow-600">Warnings: </span>
              <span className="text-sm font-bold text-yellow-600">{stats.withWarnings}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-green-600">Perfect: </span>
              <span className="text-sm font-bold text-green-600">{stats.perfect}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {stats.withIssues > 0 && (
              <span className="text-red-600">
                {stats.titleTooShort + stats.titleTooLong} title issues, {stats.excerptTooShort + stats.excerptTooLong} excerpt issues
              </span>
            )}
            {loadError && (
              <span className="text-red-600 font-medium"> {loadError}</span>
            )}
          </div>
        </div>
        {scanErrors.length > 0 && (
          <div className="mt-2 text-xs text-yellow-600">
            {scanErrors.length} file(s) could not be fully analyzed. Check console for details.
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onSelectFile={selectFile}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {loadingFile ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <SEOAuditPanel
              file={fileData}
              onSave={handleSave}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
}

