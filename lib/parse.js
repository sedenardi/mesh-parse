const cheerio = require('cheerio');

module.exports.parseRecord = function(str) {
  const $ = cheerio.load(str);
  const record = {
    DescriptorUI: $('DescriptorRecord > DescriptorUI').text().trim(),
    DescriptorName: $('DescriptorRecord > DescriptorName').text().trim(),
    TreeNumbers: $('DescriptorRecord > TreeNumberList > TreeNumber').map((i, ele) => {
      return $(ele).text().trim();
    }).get(),
    RelatedDescriptors: $('DescriptorRecord > SeeRelatedList > SeeRelatedDescriptor').map((i, ele) => {
      const related = {
        DescriptorUI: $(ele).find('DescriptorUI').text().trim(),
        DescriptorName: $(ele).find('DescriptorName').text().trim(),
      };
      return related;
    }).get(),
    Concepts: $('DescriptorRecord > ConceptList > Concept').map((i, ele) => {
      const concept = {
        PreferredConceptYN: $(ele).attr('PreferredConceptYN'.toLowerCase()),
        ConceptUI: $(ele).find('ConceptUI').text().trim(),
        ConceptName: $(ele).find('ConceptName').text().trim(),
        ScopeNote: $(ele).find('ScopeNote').text().trim(),
        ConceptRelations: $(ele).find('ConceptRelation').first().children().map((i, ele2) => {
          return $(ele2).text().trim();
        }).get(),
        Terms: $(ele).find('Term').map((i, ele2) => {
          const term = {
            ConceptPreferredTermYN: $(ele2).attr('ConceptPreferredTermYN'.toLowerCase()),
            IsPermutedTermYN: $(ele2).attr('IsPermutedTermYN'.toLowerCase()),
            LexicalTag: $(ele2).attr('LexicalTag'.toLowerCase()),
            RecordPreferredTermYN: $(ele2).attr('RecordPreferredTermYN'.toLowerCase()),
            TermUI: $(ele2).find('TermUI').text().trim(),
            Term: $(ele2).find('String').text().trim(),
          };
          return term;
        }).get(),
      };
      return concept;
      return $(ele).text().trim();
    }).get(),
  };

  return record;
};
