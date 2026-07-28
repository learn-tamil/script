Tamil Script
===

This projects aims to provide the set of 247 letters of the Tamil script in various formats.

Installation
---

```sh
npm install @learn-tamil/script
```

The Script
---

The default export contains all 247 letters, grouped into 19 rows of 13 – the first row holds the vowels
(and `ஃ`), every following row holds one consonant with its vowel combinations.

```js
import script from '@learn-tamil/script';

script[0][1]; // { index: 1, romanization: 'a', script: 'அ', iso15919: 'a', ipa: 'a' }
script[1][1]; // { index: 14, romanization: 'ka', script: 'க', iso15919: 'ka', ipa: 'ka' }
```

The same data is available as the named export `script`. Letters borrowed from the Grantha script
(`ஜ்`, `ஶ்`, `ஷ்`, `ஸ்`, `ஹ்` and `க்ஷ்`) are kept separately in `granthaScript`.

Transliteration
---

Three functions transliterate a Tamil phrase into another notation. Characters that are not part of the
Tamil script – punctuation, latin letters, numbers – are passed through untouched.

```js
import { getRomanization, getIso15919, getIPA } from '@learn-tamil/script';

getRomanization('பாடசாலைக்கு சென்றேன்'); // 'paadasaalaikku senReen'
getIso15919('பாடசாலைக்கு சென்றேன்'); // 'pāṭacālaikku ceṉṟēṉ'
getIPA('பாடசாலைக்கு சென்றேன்'); // 'paːɖat͡ɕaːlaɪkku t͡ɕenreːn'
```

- `getRomanization` – a plain ASCII transliteration, useful for typing and search
- `getIso15919` – the [ISO 15919](https://en.wikipedia.org/wiki/ISO_15919) standard for romanizing Indic scripts
- `getIPA` – the [International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet)

Grantha letters are left as they are unless you opt in to them:

```js
getIso15919('ஜ்'); // 'ஜ்'
getIso15919('ஜ்', { grantha: true }); // 'j'
```

Contribution
---

Want to provide another format? Just fork this repository, add your format and send me a Pull Request!

About
---
Aheenam is a small company from NRW, Germany creating custom digital solutions. Visit [our website](https://aheenam.com) to find out more about us.

License
---
The MIT License (MIT). Please see [License File](LICENSE)
for more information.
