package com.asu.hsi.data;

import java.io.File;
import java.io.FileInputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.asu.hsi.engine.HackEntryManager;

public class DataImporter {

	static String pathToFile = "C:\\Bharat\\Masters Material\\Applied Project\\Security Incidents.xlsx";

	public static void main(String[] args) {
		try {
			FileInputStream file = new FileInputStream(new File(pathToFile));

			// Create Workbook instance holding reference to .xlsx file
			XSSFWorkbook workbook = new XSSFWorkbook(file);

			// Get first/desired sheet from the workbook
			XSSFSheet sheet = workbook.getSheetAt(0);

			int count = 0;
			// Iterate through each rows one by one
			for (Row row : sheet) {
				// For each row, iterate through all the columns
				if (count < 2){
					count ++;
					continue;
				}
				
				String[] values = new String[16];
				for (int x = 0; x < 16; x++) {
					getValueFromFile(values, row, x);
				}
				
				boolean flag = HackEntryManager.insertHack(values);
				
				String st = "";
				if (flag){
					st = "Successful";
				} else {
					st = "Failed";
				}
				System.out.println(st);
				
				/*for (Cell cell : row) {
					// Check the cell type and format accordingly
					switch (cell.getCellType()) {
					case Cell.CELL_TYPE_NUMERIC:
						System.out.print(cell.getNumericCellValue() + "\t");
						break;
					case Cell.CELL_TYPE_STRING:
						System.out.print(cell.getStringCellValue() + "\t");
						break;
					}
				}
				System.out.println("");*/
			}
			file.close();
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private static void getValueFromFile(String[] values, Row row, int num){
		try{
			if (num == 12) {
				values[num] = row.getCell(num).getNumericCellValue() + "";
			} else {
				values[num] = row.getCell(num).getStringCellValue();
			}
		} catch (NullPointerException e) {
			values[num] = "";
		}
	}

}