const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ambil semua prodi
exports.getAllProdi = async (req, res) => {
  try {
    const prodi = await prisma.prodi.findMany({
      include: { jurusan: true }, // Jika ingin juga menampilkan relasi jurusan
    });
    res.json(prodi);
  } catch (error) {
    console.error("Error fetching prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Ambil prodi berdasarkan ID
exports.getProdiById = async (req, res) => {
  try {
    const prodi = await prisma.prodi.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { jurusan: true },
    });
    res.json(prodi);
  } catch (error) {
    console.error("Error fetching prodi by ID:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Tambah prodi
exports.createProdi = async (req, res) => {
  try {
    const { nama, jurusanId } = req.body;

    const newProdi = await prisma.prodi.create({
      data: {
        nama,
        jurusanId: parseInt(jurusanId),
      },
    });

    res.status(201).json(newProdi);
  } catch (error) {
    console.error("Error creating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan prodi." });
  }
};

// Update prodi
exports.updateProdi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, jurusanId } = req.body;

    const updatedProdi = await prisma.prodi.update({
      where: { id: parseInt(id) },
      data: {
        nama,
        jurusanId: parseInt(jurusanId),
      },
    });

    res.json(updatedProdi);
  } catch (error) {
    console.error("Error updating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui prodi." });
  }
};

// Hapus prodi
exports.deleteProdi = async (req, res) => {
  try {
    await prisma.prodi.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Prodi berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus prodi." });
  }
};