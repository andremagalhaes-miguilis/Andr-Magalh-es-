import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Sale, Product, Client, Supply } from '../types';

export const generateSalesReport = (sales: Sale[]) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Sales Report - Espresso Flow", 14, 22);
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  const tableData = sales.map(sale => [
    sale.id,
    sale.date,
    `$${sale.total.toFixed(2)}`,
    sale.paymentMethod,
    sale.items,
    sale.clientName || 'Guest'
  ]);

  autoTable(doc, {
    head: [['ID', 'Date', 'Total', 'Method', 'Items', 'Client']],
    body: tableData,
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [96, 63, 45] } // Coffee color
  });

  doc.save(`sales_report_${Date.now()}.pdf`);
};

export const generateInventoryReport = (products: Product[], supplies: Supply[]) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Inventory & Supply Report", 14, 22);
  
  // Products Table
  doc.setFontSize(14);
  doc.text("Products", 14, 35);
  autoTable(doc, {
    startY: 40,
    head: [['Product', 'Category', 'Price', 'Stock']],
    body: products.map(p => [p.name, p.category, `$${p.price.toFixed(2)}`, p.stock]),
    headStyles: { fillColor: [96, 63, 45] }
  });

  // Supplies Table
  // @ts-ignore (jspdf-autotable adds lastAutoTable to doc)
  const finalY = doc.lastAutoTable.finalY || 100;
  
  doc.text("Supplies", 14, finalY + 15);
  autoTable(doc, {
    startY: finalY + 20,
    head: [['Item', 'Quantity', 'Unit', 'Status']],
    body: supplies.map(s => [s.name, s.quantity, s.unit, s.status]),
    headStyles: { fillColor: [129, 91, 68] }
  });

  doc.save(`inventory_report_${Date.now()}.pdf`);
};

export const generateClientReport = (clients: Client[]) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Client CRM Report", 14, 22);

  autoTable(doc, {
    startY: 35,
    head: [['Name', 'Email', 'Points', 'Total Spent', 'Last Visit']],
    body: clients.map(c => [c.name, c.email, c.points, `$${c.totalSpent.toFixed(2)}`, c.lastVisit]),
    headStyles: { fillColor: [96, 63, 45] }
  });

  doc.save(`client_report_${Date.now()}.pdf`);
};