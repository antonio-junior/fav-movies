export default function clickSection(sectionId) {
  return {
    type: 'SECTION_CLICKED',
    payload: sectionId,
  };
}
