import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


export const reportDrivers = () => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const cabecalho = {
        text: 'Condutores',
        
    };

    const corpo = [



    ];

    const rodape = [];


    const docDefinitions = {
        pageSize : 'A4',
        pageOrientation: 'landscape',
        pageMargins: [35, 20, 35, 35],

        header: [cabecalho],
        content: [corpo],
        footer: [rodape]
    };

    pdfMake.createPdf(docDefinitions).open();


}