import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import "dotenv/config";

export const languages: Prisma.LanguageCreateInput[] = [
  { name: "Polish" },
  { name: "English" },
  { name: "French" },
  { name: "German" },
  { name: "Spanish" },
  { name: "Italian" },
  { name: "Russian" },
  { name: "Portuguese" },
  { name: "Dutch" },
  { name: "Swedish" },
  { name: "Norwegian" },
  { name: "Danish" },
  { name: "Finnish" },
  { name: "Greek" },
  { name: "Hungarian" },
  { name: "Czech" },
  { name: "Slovak" },
  { name: "Bulgarian" },
  { name: "Romanian" },
  { name: "Serbian" },
  { name: "Croatian" },
  { name: "Slovene" },
  { name: "Estonian" },
  { name: "Latvian" },
  { name: "Lithuanian" },
  { name: "Icelandic" },
  { name: "Irish" },
  { name: "Maltese" },
  { name: "Macedonian" },
  { name: "Bosnian" },
  { name: "Albanian" },
  { name: "Ukrainian" },
  { name: "Belarusian" },
  { name: "Turkish" },
  { name: "Chinese" },
  { name: "Japanese" },
  { name: "Korean" },
  { name: "Hindi" },
  { name: "Bengali" },
  { name: "Punjabi" },
  { name: "Urdu" },
  { name: "Tamil" },
  { name: "Telugu" },
  { name: "Malayalam" },
  { name: "Kannada" },
  { name: "Marathi" },
  { name: "Gujarati" },
  { name: "Sinhala" },
  { name: "Thai" },
  { name: "Malay" },
  { name: "Indonesian" },
  { name: "Vietnamese" },
  { name: "Khmer" },
  { name: "Lao" },
  { name: "Burmese" },
  { name: "Arabic" },
  { name: "Hebrew" },
  { name: "Persian" },
  { name: "Pashto" },
  { name: "Kyrgyz" },
  { name: "Kazakh" },
  { name: "Uzbek" },
  { name: "Turkmen" },
  { name: "Mongolian" },
  { name: "Nepali" },
  { name: "Swahili" },
  { name: "Yoruba" },
  { name: "Igbo" },
  { name: "Amharic" },
  { name: "Hausa" },
  { name: "Oromo" },
  { name: "Somali" },
  { name: "Zulu" },
  { name: "Xhosa" },
  { name: "Afrikaans" },
  { name: "Sesotho" },
  { name: "Tswana" },
  { name: "Kinyarwanda" },
  { name: "Lingala" },
  { name: "Kongo" },
  { name: "Chichewa" },
  { name: "Tsonga" },
  { name: "Venda" },
  { name: "Shona" },
  { name: "Northern Sotho" },
  { name: "Swati" },
];

async function main() {
  for (const language of languages) {
    await db.language.create({
      data: language,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
