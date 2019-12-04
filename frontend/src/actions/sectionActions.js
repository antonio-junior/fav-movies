export default function clickSection(name) {
  return {
    type: 'SECTION_CLICKED',
    payload: name,
  };
}
