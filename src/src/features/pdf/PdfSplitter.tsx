import { useState } from "react";
import { PDFDocument } from "pdf-lib";

const PdfSplitter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const splitPdf = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async (event) => {
      if (!event.target?.result) return;

      const pdfBytes = new Uint8Array(event.target.result as ArrayBuffer);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const totalPages = pdfDoc.getPageCount();

      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const newPdfBytes = await newPdf.save();
        const blob = new Blob([newPdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `page_${i + 1}.pdf`;
        link.click();
      }

      alert("PDF split completed!");
    };
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">PDF Splitter</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-2" />
      <button onClick={splitPdf} className="px-4 py-2 bg-blue-500 text-white rounded">
        Split PDF
      </button>
    </div>
  );
};

export default PdfSplitter;
