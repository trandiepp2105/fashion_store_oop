function generateSlug(name, id) {
  // Bảng chuyển đổi ký tự có dấu sang không dấu
  const from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

  // Loại bỏ dấu tiếng Việt
  const normalized = name
    .toLowerCase()
    .split("")
    .map((char) => {
      const i = from.indexOf(char);
      return i !== -1 ? to[i] : char;
    })
    .join("");

  // Thay khoảng trắng và ký tự đặc biệt bằng dấu gạch ngang
  return (
    id + "-" + normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );
}

export default generateSlug;
