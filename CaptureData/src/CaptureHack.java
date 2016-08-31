
import java.io.FileWriter;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Captures Data from PrivacyRights.org
 * 
 * @author Bharat
 *
 */
public class CaptureHack {

	final static int recNum = 4800;
	
	static String folder = "C:/Bharat/Masters Material/Applied Project/CaptureData/xmlData/";

	static String[] desc = new String[recNum];
	static String[] date = new String[recNum];
	static String[] name = new String[recNum];
	static String[] location = new String[recNum];
	static String[] org = new String[recNum];
	static String[] hType = new String[recNum];
	static String[] recs = new String[recNum];
	static int current = 0;

	/**
	 * 
	 */
	public CaptureHack() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {

		Document doc = Jsoup.connect("https://www.privacyrights.org/data-breach/new").data("breachtype[269]", "269")
				.data("breachtype[268]", "268").data("breachtype[267]", "267").data("breachtype[285]", "285")
				.data("breachtype[264]", "264").data("breachtype[265]", "265").data("breachtype[266]", "266")
				.data("breachtype[270]", "270").data("orgtype[262]", "262").data("orgtype[261]", "261")
				.data("orgtype[260]", "260").data("orgtype[259]", "259").data("orgtype[258]", "258")
				.data("orgtype[257]", "257").data("orgtype[263]", "263").data("breachyear[2122]", "2122")
				.data("breachyear[271]", "271").data("breachyear[272]", "272").data("breachyear[273]", "273")
				.data("breachyear[274]", "274").data("breachyear[275]", "275").data("breachyear[276]", "276")
				.data("breachyear[306]", "306").data("breachyear[513]", "513").data("breachyear[1153]", "1153")
				.data("breachyear[1473]", "1473").data("breachyear[2257]", "2257").post();

		getDataFromDoc(doc);

		for (int x = 1; x <= 95; x++) {
			doc = Jsoup.connect("https://www.privacyrights.org/data-breach/new?title=&page=" + x)
					.data("breachtype[269]", "269").data("breachtype[268]", "268").data("breachtype[267]", "267")
					.data("breachtype[285]", "285").data("breachtype[264]", "264").data("breachtype[265]", "265")
					.data("breachtype[266]", "266").data("breachtype[270]", "270").data("orgtype[262]", "262")
					.data("orgtype[261]", "261").data("orgtype[260]", "260").data("orgtype[259]", "259")
					.data("orgtype[258]", "258").data("orgtype[257]", "257").data("orgtype[263]", "263")
					.data("breachyear[2122]", "2122").data("breachyear[271]", "271").data("breachyear[272]", "272")
					.data("breachyear[273]", "273").data("breachyear[274]", "274").data("breachyear[275]", "275")
					.data("breachyear[276]", "276").data("breachyear[306]", "306").data("breachyear[513]", "513")
					.data("breachyear[1153]", "1153").data("breachyear[1473]", "1473").data("breachyear[2257]", "2257")
					.post();

			getDataFromDoc(doc);
			System.out.println("Pulled data from page -> " + x);
		}

		// display();
		writeCSV();
	}

	private static void getDataFromDoc(Document doc) {
		// Find out all the dates
		Elements datesEl = doc.select("table.data-breach-table > tbody > tr > td > span.date-display-single");

		// Finds out all the names
		Elements namesEl = doc.select("table.data-breach-table > tbody > tr > td > strong");

		// Finds out all the description
		Elements descsEl = doc.select("table.data-breach-table > tbody > tr > td.Array");
		
		Elements recEl = doc.select("table.data-breach-table > tbody > tr > td");

		int temp4 = current;
		for (Element el : recEl) {
			String s = el.html();
			if (s != null) {
				s = s.replace(",", " ");
			}
			if (el.hasAttr("align") && !el.hasAttr("colspan")) {
				s = Jsoup.parse(s).text();
				recs[temp4++] = s;
			}
		}
		
		
		int temp1 = current;
		int temp2 = current;
		int temp3 = current;
		boolean flag = false;
		for (Element el : descsEl) {
			String s = el.html();
			if (s != null) {
				s = s.replace(",", " ");
			}
			if (!el.html().contains("<")) {
				if (!flag) {
					org[temp1++] = s;
					flag = true;
				} else {
					hType[temp2++] = s;
					flag = false;
				}
			} else if (el.hasAttr("colspan") && "4".equals(el.attr("colspan")) && !el.hasAttr("align")) {
				s = Jsoup.parse(s).text();
				desc[temp3++] = s.replaceAll("<em>|</em>|<br>|<p>|</p>", " ");
			} 
		}

		int temp = current;
		for (Element el : datesEl) {
			String s = el.html();
			if (s != null) {
				s = s.replace(",", " ");
			}
			date[temp++] = s;
		}

		temp = current;
		for (Element el : namesEl) {
			String s = el.html();
			if (s != null) {
				s = s.replace(",", " ");
			}
			String[] tp = s.split("<br>");
			name[temp] = tp[0];
			location[temp] = tp[1];
			temp++;
		}

		current += 50;
	}

	/**
	 * Displays Crawled Data
	 */
	public static void display() {
		int count = 0;
		for (String nm : name) {
			System.out.println(count + 1 + ": " + date[count] + " -> " + nm + "\n" + desc[count] + "\n" + org[count]
					+ "\n" + hType[count]);
			count++;
		}
	}

	/**
	 * Write crawled data to CSV
	 */
	public static void writeCSV() throws IOException {
		System.out.println("Writing data to CSV.....");
		String filePath = "C:/Bharat/Masters Material/Applied Project/CaptureData/Hacks.csv";
		FileWriter writer = new FileWriter(filePath);
		writer.append("File, Date, Name, Location, Org, Type, Records, Description\n");

		for (int x = 0; x < recNum; x++) {
			String link = "=HYPERLINK(\"" + folder + "Victim" + x +".xml" + "\")";
			String out = link + "," +date[x] + ", " + name[x] + ", " + location[x] + ", " + org[x] + ", " + hType[x] + ", "
					+ recs[x] + ", " + desc[x] + "\n";
			writer.append(out);
		}

		writer.flush();
		writer.close();
		System.out.println("Done");
		
		System.out.println("Creating Hack XMLs....");
		FileHandler.writeXmlFiles();
		System.out.println("Done");
	}

}
