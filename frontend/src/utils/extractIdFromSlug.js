function extractIdFromSlug(slug) {
  // ID nằm trước dấu gạch ngang đầu tiên
  const id = slug.split("-")[0];
  return parseInt(id, 10); // Chuyển thành số nguyên
}
export default extractIdFromSlug;
