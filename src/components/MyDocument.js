import React from 'react';
import PdfViewer from './PdfViewer';
import { useParams } from 'react-router-dom';

const MyDocument = () => {
const { fileName } = useParams();
console.log(fileName)
return (
    <div>
        {fileName && <PdfViewer pdfUrl={`/Assets/${fileName}`} />}
    </div>
);
};

export default MyDocument;
