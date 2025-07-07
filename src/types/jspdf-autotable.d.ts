// types/jspdf-autotable.d.ts
import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

declare namespace AutoTable {
  interface Options {
    startY?: number;
    head?: (string[] | unknown[][])[];
    body?: (string | number)[][];
    // add other options as needed
  }
}
