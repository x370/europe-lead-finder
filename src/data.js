// Countries with cities already mapped (your active outreach targets)
export const COUNTRIES = {
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Leipzig", "Dresden", "Nuremberg", "Bremen", "Hanover", "Essen", "Dortmund", "Bonn"],
  Austria: ["Vienna", "Graz", "Salzburg", "Linz", "Innsbruck", "Klagenfurt"],
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne", "St. Gallen"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg"],
  France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Malaga", "Bilbao", "Zaragoza"],
  Italy: ["Rome", "Milan", "Naples", "Turin", "Florence", "Bologna", "Venice", "Genoa"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Edinburgh", "Bristol", "Liverpool", "Sheffield"],
  Ireland: ["Dublin", "Cork", "Galway", "Limerick"],
  Belgium: ["Brussels", "Antwerp", "Ghent", "Bruges"],
  Sweden: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  Poland: ["Warsaw", "Krakow", "Wroclaw", "Poznan", "Gdansk"],
  Denmark: ["Copenhagen", "Aarhus", "Odense"],
  Norway: ["Oslo", "Bergen", "Trondheim"],
  Finland: ["Helsinki", "Espoo", "Tampere"],
  Portugal: ["Lisbon", "Porto", "Braga"],
  "Czech Republic": ["Prague", "Brno", "Ostrava"],
  Greece: ["Athens", "Thessaloniki"],
  Hungary: ["Budapest", "Debrecen"],
  Romania: ["Bucharest", "Cluj-Napoca", "Timisoara"],
  Luxembourg: ["Luxembourg City"],
};

// All world countries (no cities mapped) — add these to a plain dropdown,
// or fill in cities later as needed for outreach expansion
export const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe",
];

export const TYPES = [
  "restaurant", "dentist", "hotel", "hair salon", "beauty salon", "real estate agency",
  "law firm", "accountant", "gym", "physiotherapy", "clinic", "car repair",
  "construction company", "furniture store", "travel agency", "photographer", "cafe", "school",
  "software house", "IT agency", "web design agency", "marketing agency", "startup"
];

export const COMPANY_STAGE = ["Startup", "Intermediate", "Established/Old"];

export const STATUS = ["New", "Pitch Sent", "Reply Received", "Call Scheduled", "Won", "Lost"];