// types/jspdf-autotable.d.ts
import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
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
