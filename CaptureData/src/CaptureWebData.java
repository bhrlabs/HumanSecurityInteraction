
import java.io.File;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * 
 */

/**
 * @author shakti
 *
 */
public class CaptureWebData {

	/**
	 * 
	 */
	public CaptureWebData() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception{
		File file = new File("C:/Bharat/Masters Material/Applied Project/Privacy Rights/Privacy Rights Clearinghouse.html");
		String URL = "https://www.privacyrights.org/data-breach/new?title=&page=1";
		//get content showing records breached
		// Document doc = Jsoup.connect(URL).get();
		// Elements newsHeadlines = doc.select("fieldset.collapsible > div > font");
		
		Document doc = Jsoup.parse(file, "UTF-8");
		
		Elements newsHeadlines = doc.select("table.data-breach-table > tbody > tr > td"); 

		// Find out all the dates
		Elements datesEl = doc.select("table.data-breach-table > tbody > tr > td > span.date-display-single");
		
		// Finds out all the names
		Elements namesEl = doc.select("table.data-breach-table > tbody > tr > td > strong");
		
		// Finds out all the description
		Elements descsEl = doc.select("table.data-breach-table > tbody > tr > td.Array");
		String[] descs = new String[50];
		
		int count = 0;
		for (Element el : descsEl) {
			if (el.hasAttr("colspan") && "4".equals(el.attr("colspan")) &&!el.hasAttr("align")){
				descs[count++] = el.html().replaceAll("<em>|</em>|<br>|<p>|</p>", " ");
				//System.out.println(descs[count-1]+ "\n");
			}
		}
		
		//System.out.println(descsEl.html());
		
		String[] dates = datesEl.html().split("\n");
		String[] names = namesEl.html().replaceAll("<br>", " ").split("\n");

		count = 0;
		
		for (String name : names){
			System.out.println(count+1 + ": " + dates[count] + " -> " + name + "\n" + descs[count] + "\n");
			count++;
		}
		
		//System.out.println(newsHeadlines.html());
	}

}
