import React from 'react';
import PdfSplitter from '../features/pdf/PdfSplitter';

interface Props {

}

const PdfSplitterPage: React.FC<Props> = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <PdfSplitter />
    </div>
  );
}

export default PdfSplitterPage;
