import asyncHandler from "express-async-handler";

import {prisma} from '../config/prismaConfig.js'


// create residency
export const createResidency = asyncHandler(async (req, res) => {
    const {title, description, price, address, country, city, facilities, image, userEmail} = req.body.data;

    console.log(req.body.data)
    try{
       const residency  = await prisma.residency.create({
        data: {
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner : {connect : {email: userEmail}},
        },
       });

       res.send({message: "Residency created successfully", residency});
    } catch(err){
        if(err.code === "P202")
        {
            throw new Error("A residency with address already there")
        }
        throw new Error(err.message);
    }
});
// get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    res.send(residencies);
})

// get single residency
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const residency = await prisma.residency.findUnique({
        where: { id },
      });
      res.send(residency);
    } catch (err) {
      throw new Error(err.message);
    }
  });