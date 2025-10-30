import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePdf = (order) => {
  try {
    // 1. Create a new PDF document
    const doc = new jsPDF();

    // 2. Add content to the PDF
    // Add a title
    doc.setFontSize(22);
    doc.text('Invoice', 14, 22);

    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice ID: INV-${order.id}`, 14, 40);
    doc.text(`Challan ID: ${order.challanId}`, 14, 47);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 54);

    // Add customer details
    doc.text('Bill To:', 14, 70);
    doc.text(order.customer, 14, 77);

    // 3. Add a table with order items
    // For this example, we'll create a simple table.
    // The 'items' field is a string, so we'll treat it as a single description.
    // A placeholder price is used since it's not in the order data.
    const tableColumn = ["Item Description", "Quantity", "Unit Price", "Total"];
    const tableRows = [
      [order.items, "1", "$150.00", "$150.00"] // Placeholder data
    ];

    autoTable(doc, {
      startY: 85,
      head: [tableColumn],
      body: tableRows,
    });

    // 4. Add a total at the end
    const finalY = doc.lastAutoTable.finalY; // Get the Y position of the last table row
    doc.setFontSize(14);
    doc.text('Total: $150.00', 145, finalY + 15);

    // 5. Save the PDF
    doc.save(`invoice-${order.challanId}.pdf`);
    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};