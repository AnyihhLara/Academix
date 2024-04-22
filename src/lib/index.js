import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDF(dataArray, title, download = true, open = false) {
	const doc = new jsPDF();
	doc.setFont('Helvetica', 'normal');
	doc.setTextColor(0, 0, 0);
	doc.text(title, 14, 22);

	let startY = 40; // Initial Y position for the first table

	dataArray.forEach((data) => {
		if (data && data.length > 0) {
			const headers = Object.keys(data[0]);
			const body = data.map((row) => headers.map((header) => row[header]));

			autoTable(doc, {
				head: [headers],
				body,
				startY
			});

			// Update the Y position for the next table
			startY = doc.lastAutoTable.finalY + 10;
		}
	});

	if (download) {
		doc.save(title + '.pdf');
	}

	if (open) {
		window.open(doc.output('bloburl'), '_blank');
	}
}
