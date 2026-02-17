import { useState, useEffect, useRef } from 'preact/hooks';
import * as pdfjsLib from 'pdfjs-dist';

export default function PDFViewer({ pdfUrl, fileName = 'davis-resume.pdf' }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  // Initialize worker on component mount
  useEffect(() => {
    const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
  }, []);

  // Load and render PDF
  useEffect(() => {
    if (!pdfUrl) return;

    const loadAndRenderPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading PDF from:', pdfUrl);

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setNumPages(pdf.numPages);

        // Render the first page
        const page = await pdf.getPage(1);
        renderPage(page);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(`Failed to load PDF: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadAndRenderPdf();
  }, [pdfUrl]);

  // Render page when current page changes
  useEffect(() => {
    if (!pdfUrl || !currentPage || loading) return;

    const renderCurrentPage = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(currentPage);
        renderPage(page);
      } catch (err) {
        console.error('Error rendering page:', err);
        setError(`Failed to render page: ${err.message}`);
      }
    };

    renderCurrentPage();
  }, [currentPage, pdfUrl, loading]);

  const renderPage = async (page) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scale = 2;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    try {
      await page.render(renderContext).promise;
      console.log(`Page ${currentPage} rendered successfully`);
    } catch (err) {
      console.error('Error rendering to canvas:', err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error loading PDF</p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading PDF...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            ← Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
            disabled={currentPage === numPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Next →
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            ⬇️ Download
          </button>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex-1 overflow-auto border border-gray-300 rounded-lg bg-gray-50">
        <div className="flex justify-center p-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-200 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
