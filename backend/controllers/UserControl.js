import User from "../models/UserModel.js";
import { Op } from "sequelize";               // library Operator

export const getUsers = async (req, res) => {

  /*
    * req.query.page = berisi string
    * parseInt() = convert ke integer
    
    ? deklarasi query parameter by page berisi integer
    ! berisi current page
    ! || 0 = jika user tidak mengirim query page  */
  const page = parseInt(req.query.page) || 0;

  /* 
    ? deklarasi query parameter by limit berisi integer
    ! batas data untuk ditampilkan
    ! || 10 = jika user tidak mengirim query limit  */
  const limit = parseInt(req.query.limit) || 10;

  /* 
    ? deklarasi query parameter by search berisi string
    ! batas data search yang diketik user
    ! || "" = jika user tidak mengirim query limit  */
  const search = req.query.search_query || "";

  /* 
    ? deklarasi batas data yang ditampilkan  */
  const offset = limit * page;

  /* 
    ? deklarasi jumlah baris data yang ditampilkan  */
  const totalRows = await User.count({
    where: {
      // deklarasi operator dengan or
      [Op.or]: [
        {
        name: {
          // deklarasi operaator dengan pencarian serupa
          // ! "%" = pencarian kata depan atau belakang
          [Op.like]: '%'+search+'%'
        }
        },
        {
          email: { [Op.like]: '%'+search+'%' },
        }
      ]
    }
  });

  /* 
    ? deklarasi jumlah page data yang ditampilkan
    ! Math.ceil = untuk mengambil value tertinggi hasil pembagian  */
  const totalPage = Math.ceil(totalRows / limit);

  /* 
    ? deklarasi jumlah data yang ditampilkan
    ! Math.ceil = untuk mengambil value tertinggi hasil pembagian  */
  const result = await User.findAll({
    where: {
      // deklarasi operator dengan or
      [Op.or]: [
        {
        name: {
          // deklarasi operaator dengan pencarian serupa
          // ! "%" = pencarian kata depan atau belakang
          [Op.like]: '%'+search+'%'
        }
        },
        {
          email: { [Op.like]: '%'+search+'%' },
        }
      ]
    },
    offset: offset,
    limit: limit,
    order: [
      ['id', 'DESC']    // ! DESC = menampilkan data terbaru
    ]   
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage
  });
};
