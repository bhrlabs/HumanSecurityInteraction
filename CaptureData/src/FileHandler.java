import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileHandler {

	public static void writeXmlFiles() throws IOException {
		for (int x = 0; x < CaptureHack.recNum; x++) {

			FileReader fileReader = null;
			try {
				fileReader = new FileReader(CaptureHack.folder + "Victim Sample.xml");
			} catch (FileNotFoundException e) {
				System.out.println("File Not Found");
				System.exit(1);
			}
			BufferedReader bufferedReader = new BufferedReader(fileReader);

			FileWriter fileWriter = new FileWriter(
					"C:/Bharat/Masters Material/Applied Project/CaptureData/xmlData/Victim" + x + ".xml");
			BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

			String line = "";
			while ((line = bufferedReader.readLine()) != null) {
				if (line.contains("<type>")) {
					line = "\t<type>" + CaptureHack.hType[x] + "</type>";
				} else if (line.contains("<Industry>")) {
					line  = "\t\t<Industry>" + CaptureHack.name[x] + "</Industry>";
				} else if (line.contains("<Type>")) {
					line = "\t\t<Type>" + CaptureHack.org[x] + "</Type>";
				} else if (line.contains("<Comments>")) {
					line = "\t\t<Comments>" + CaptureHack.desc[x] + "</Comments>";
				} else if (line.contains("<address>")) {
					line = "\t\t<address>" + CaptureHack.location[x] + "</address>";
				} else if (line.contains("<date>")) {
					line = "\t\t<date>" + CaptureHack.date[x] + "</date>";
				}
				bufferedWriter.write(line+"\n");
			}

			// Always close files.
			bufferedWriter.close();
			fileWriter.close();
			bufferedReader.close();
			fileReader.close();
		}
	}
}
