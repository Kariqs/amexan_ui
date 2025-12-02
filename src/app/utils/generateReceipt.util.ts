import jsPDF from 'jspdf';
import { Order } from '../models/model';

export class PdfUtil {
  static generateReceipt(order: Order, logoUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF();

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Simplified color palette - just 3 colors
      const primaryBlue = [37, 99, 235]; // Clean blue for headers
      const darkText = [75, 85, 99]; // Softer dark gray for main text
      const lightGray = [243, 244, 246]; // Very light gray for backgrounds

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = logoUrl;

      img.onload = () => {
        try {
          // Logo - proper proportions
          const logoSize = 25; // Square logo
          const logoX = (pageWidth - logoSize) / 2;
          doc.addImage(img, 'PNG', logoX, 15, logoSize, logoSize);

          // Company Name - dark text on white background
          doc.setTextColor(darkText[0], darkText[1], darkText[2]);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Freeridge Hub Medical Store', pageWidth / 2, 42, {
            align: 'center',
          });

          let y = 60;

          // Order Information Section
          doc.setTextColor(darkText[0], darkText[1], darkText[2]);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Order Information', 20, y);

          y += 10;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');

          doc.text(`Order ID: #${order.ID}`, 20, y);
          y += 6;
          doc.text(
            `Date: ${new Date(order.CreatedAt).toLocaleDateString()}`,
            20,
            y
          );
          y += 6;
          doc.text(`Status: ${order.status}`, 20, y);

          y += 20;

          // Customer Information Section
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Customer Information', 20, y);

          y += 10;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');

          doc.text(`Name: ${order.firstName} ${order.lastName}`, 20, y);
          y += 6;
          doc.text(`Email: ${order.email}`, 20, y);
          y += 6;
          doc.text(`Phone: ${order.phone}`, 20, y);
          y += 6;
          doc.text(`Location: ${order.deliveryLocation}`, 20, y);

          y += 20;

          // Items Section
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Order Items', 20, y);

          y += 15;

          // Simple table header with light background
          doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
          doc.rect(15, y - 5, pageWidth - 30, 12, 'F');

          doc.setTextColor(darkText[0], darkText[1], darkText[2]);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');

          y += 3;
          doc.text('ITEM', 20, y);
          doc.text('QTY', 110, y);
          doc.text('PRICE', 135, y);
          doc.text('TOTAL', 165, y);

          y += 12;

          // Table items - simple alternating rows
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);

          order.orderItems.forEach((item: any, index: number) => {
            // Light gray background for every other row
            if (index % 2 === 0) {
              doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
              doc.rect(15, y - 3, pageWidth - 30, 10, 'F');
            }

            const total = item.price * item.quantity;

            doc.text(item.name, 20, y + 2);
            doc.text(item.quantity.toString(), 110, y + 2);
            doc.text(`KSh ${item.price.toLocaleString()}`, 135, y + 2);
            doc.text(`KSh ${total.toLocaleString()}`, 165, y + 2);
            y += 10;
          });

          y += 15;

          // Total Section - simple with primary color background
          doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
          doc.rect(15, y - 5, pageWidth - 30, 25, 'F');

          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');

          y += 3;
          doc.text('Subtotal:', 25, y);
          doc.text(
            `KSh ${(order.total / 1.1).toFixed(2).toLocaleString()}`,
            165,
            y
          );

          y += 6;
          doc.text('Delivery Fee:', 25, y);
          doc.text(
            `Ksh ${(order.total - order.total / 1.1)
              .toFixed(2)
              .toLocaleString()}`,
            165,
            y
          );

          y += 8;
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('Grand Total:', 25, y);
          doc.text(`KSh ${order.total.toFixed(2).toLocaleString()}`, 165, y);

          y += 25;

          // Simple footer message
          doc.setTextColor(darkText[0], darkText[1], darkText[2]);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text('Thank you for your purchase!', pageWidth / 2, y, {
            align: 'center',
          });
          doc.text(
            'We appreciate your business and hope you enjoy your order.',
            pageWidth / 2,
            y + 6,
            { align: 'center' }
          );

          // Simple border in primary color
          doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
          doc.setLineWidth(0.5);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

          // Save the PDF
          doc.save(`receipt_order_${order.ID}.pdf`);

          // Resolve the promise after successful PDF generation
          resolve();
        } catch (error) {
          // Reject the promise if there's an error during PDF generation
          reject(error);
        }
      };

      // Handle image loading errors
      img.onerror = (error) => {
        reject(new Error('Failed to load logo image'));
      };
    });
  }
}
