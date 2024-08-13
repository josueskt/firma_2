import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.css'
})
export class DocComponent {
numero = ''
fecha = ''
modal = false
alerta = false
firmado = false
hola(){
  if(this.numero && this.fecha){

    this.modal  =true
  } else
  {
    this.alerta = true
  }
}
con_firma(){
  this.firmado = true
  if(this.firmado){
    
    this.generatePDF('a4')
  }
}
sin_firma(){

  this.firmado = false
  if(!this.firmado){

    this.generatePDF('a4')
  }

}



public generatePDF(id: string): void {
  const data = document.getElementById(id);

  if (data) {
    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 300; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('image/png');

      const doc = new jsPDF('p', 'mm', 'a4');

      let position = 0;
      let heightLeft = imgHeight;

      // Add first page
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        doc.addPage();
        position = heightLeft - imgHeight;
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('sample.pdf');
    }).catch(error => {
      console.error('Error generating canvas:', error);
    });
  } else {
    console.error('Element with id', id, 'not found');
  }

}
}
