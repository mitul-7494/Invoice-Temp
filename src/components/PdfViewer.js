import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "./CSS/PdfViewer.css"; 
import InvoiceForm from './InvoiceForm';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [image_canvas, setImage_canvas] = useState([]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onCanvasLoaded = () => {
        const canvases = document.querySelectorAll('canvas');
        let arr = [];
        canvases.forEach(canvas => {
            arr.push(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height))
        })
        setImage_canvas(arr);
    }

    // Example data which will be replaced by api 
    const data = [
        {
            "CardCode": "1300000586",
            "TaxDate": "2024-03-13 10:15:00",
            "DocDate": "12-03-2024",
            "DocDueDate": "11-04-2024",
            "CardName": "Silver Touch Technologies Limited",
            "DiscountPercent": "",
            "DocumentLines": [
                {
                    "ItemCode": "HSN 1",
                    "Quantity": "1",
                    "TaxCode": "998315",
                    "UnitPrice": "7092.72"
                },
                {
                    "ItemCode": "HSN 1",
                    "Quantity": "1",
                    "TaxCode": "998315",
                    "UnitPrice": "29789.40"
                }
            ]
        },
        {
            "CardCode": {
                "value": "1300000586",
                "cords": [
                    {
                        "text": "1300000586",
                        "x0": 457.096,
                        "top": 83.55399999999997,
                        "x1": 503.496,
                        "bottom": 91.55399999999997
                    }
                ]
            },
            "TaxDate": {
                "value": "2024-03-13 10:15:00",
                "cords": [
                    {
                        "text": "2024-03-13 10:15:00",
                        "x0": 72.178,
                        "top": 38.835000000000036,
                        "x1": 156.39799999999997,
                        "bottom": 48.835000000000036
                    }
                ]
            },
            "DocDate": {
                "value": "12-03-2024",
                "cords": [
                    {
                        "text": "12-03-2024",
                        "x0": 457.096,
                        "top": 111.91599999999994,
                        "x1": 499.768,
                        "bottom": 119.91599999999994
                    }
                ]
            },
            "DocDueDate": {
                "value": "11-04-2024",
                "cords": [
                    {
                        "text": "11-04-2024",
                        "x0": 457.096,
                        "top": 126.07400000000007,
                        "x1": 499.96,
                        "bottom": 134.07400000000007
                    }
                ]
            },
            "CardName": {
                "value": "Silver Touch Technologies Limited",
                "cords": [
                    {
                        "text": "Silver Touch Technologies Limited",
                        "x0": 23.079,
                        "top": 56.057000000000016,
                        "x1": 159.95100000000002,
                        "bottom": 65.05700000000002
                    }
                ]
            },
            "DocumentLines": [
                {
                    "value": "HSN 1",
                    "cords": []
                },
                {
                    "value": "HSN 1",
                    "cords": []
                }
            ]
        },
        {
            "CardCode": {
                "value": "1300000586",
                "cords": []
            },
            "TaxDate": {
                "value": "2024-03-13 10:15:00",
                "cords": [
                    {
                        "text": "2024-03-13 10:15:00",
                        "x0": 72.178,
                        "top": 38.835000000000036,
                        "x1": 156.39799999999997,
                        "bottom": 48.835000000000036
                    }
                ]
            },
            "DocDate": {
                "value": "12-03-2024",
                "cords": []
            },
            "DocDueDate": {
                "value": "11-04-2024",
                "cords": []
            },
            "CardName": {
                "value": "Silver Touch Technologies Limited",
                "cords": []
            },
            "DocumentLines": [
                {
                    "value": "HSN 1",
                    "cords": []
                },
                {
                    "value": "HSN 1",
                    "cords": []
                }
            ]
        },
        {
            "CardCode": {
                "value": "1300000586",
                "cords": [
                    {
                        "text": "1300000586",
                        "x0": 110.409,
                        "top": 76.50400000000002,
                        "x1": 154.809,
                        "bottom": 84.50400000000002
                    }
                ]
            },
            "TaxDate": {
                "value": "2024-03-13 10:15:00",
                "cords": [
                    {
                        "text": "2024-03-13 10:15:00",
                        "x0": 72.178,
                        "top": 38.835000000000036,
                        "x1": 156.39799999999997,
                        "bottom": 48.835000000000036
                    }
                ]
            },
            "DocDate": {
                "value": "12-03-2024",
                "cords": [
                    {
                        "text": "12-03-2024",
                        "x0": 467.846,
                        "top": 74.54100000000005,
                        "x1": 510.71,
                        "bottom": 82.54100000000005
                    }
                ]
            },
            "DocDueDate": {
                "value": "11-04-2024",
                "cords": []
            },
            "CardName": {
                "value": "Silver Touch Technologies Limited",
                "cords": [
                    {
                        "text": "Silver Touch Technologies Limited",
                        "x0": 110.409,
                        "top": 58.384000000000015,
                        "x1": 232.07300000000004,
                        "bottom": 66.38400000000001
                    }
                ]
            },
            "DocumentLines": [
                {
                    "value": "HSN 1",
                    "cords": [
                        {
                            "text": "HSN 1",
                            "x0": 216.988,
                            "top": 159.53700000000003,
                            "x1": 403.70599999999996,
                            "bottom": 168.19299999999998
                        },
                        {
                            "text": "HSN 1",
                            "x0": 216.988,
                            "top": 188.26,
                            "x1": 403.70599999999996,
                            "bottom": 196.91600000000005
                        }
                    ]
                },
                {
                    "value": "HSN 1",
                    "cords": [
                        {
                            "text": "HSN 1",
                            "x0": 216.988,
                            "top": 159.53700000000003,
                            "x1": 403.70599999999996,
                            "bottom": 168.19299999999998
                        },
                        {
                            "text": "HSN 1",
                            "x0": 216.988,
                            "top": 188.26,
                            "x1": 403.70599999999996,
                            "bottom": 196.91600000000005
                        }
                    ]
                }
            ]
        },
        {
            "CardCode": {
                "value": "1300000586",
                "cords": []
            },
            "TaxDate": {
                "value": "2024-03-13 10:15:00",
                "cords": [
                    {
                        "text": "2024-03-13 10:15:00",
                        "x0": 72.178,
                        "top": 38.835000000000036,
                        "x1": 156.39799999999997,
                        "bottom": 48.835000000000036
                    }
                ]
            },
            "DocDate": {
                "value": "12-03-2024",
                "cords": []
            },
            "DocDueDate": {
                "value": "11-04-2024",
                "cords": []
            },
            "CardName": {
                "value": "Silver Touch Technologies Limited",
                "cords": []
            },
            "DocumentLines": [
                {
                    "value": "HSN 1",
                    "cords": []
                },
                {
                    "value": "HSN 1",
                    "cords": []
                }
            ]
        }
    ]

    return (
        <div className="container">
            <div className="content">
                {image_canvas.length === numPages ?<InvoiceForm invoiceData={data} image_canvas={image_canvas}/>:<div className="loader">Loading...</div>}
            </div>
            <div className="pdf-view">
                <Document className="InvoiceView" file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page  key={`page_${index + 1}`} pageNumber={index + 1} onRenderAnnotationLayerSuccess={onCanvasLoaded}/>
                    ))}
                </Document>
            </div>
        </div>
    );
};

export default PdfViewer;
