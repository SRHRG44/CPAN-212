import express from "express";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());

app.get("/getEdu", (req, res) => {
    const education = [
    {
        degree: "Computer Programming Diploma",
        institution: "Humber Polytechnic",
        year: "2024-2025",
    },
    {
        degree: "Culinary Management Diploma",
        institution: "George Brown College",
        year: "2010-2011/2014-2015",
    },
    {
        degree: "Specialist High Skills Major",
        institution: "Stephen Lewis Secondary School",
        year: "2006-2010",
    },
    ];
    res.json(education);
});

app.get("/getExp", (req, res) => {
    const experience = [
    {
        title: "Data Cable Technician",
        company: "Cable Ready Systems",
        year: "June 2022 - January 2023",
    },
    {
        title: "Call Center Agent",
        company: "Air Canada",
        year: "December 2021 - May 2022",
    },
    {
        title: "Ramp Allocator",
        company: "Menzies Aviation Canada",
        year: "May 2019 - March 2021",
    },
    {
        title: "Ramp Zone Supervisor",
        company: "Menzies Aviation Canada",
        year: "May 2018 - April 2019",
    },
    {
        title: "Lead hand Ramp Agent",
        company: "Menzies Aviation Canada",
        year: "December 2017 - May 2018",
    },
    {
        title: "Ramp Agent",
        company: "Menzies Aviation Canada",
        year: "June 2017 - December 2017",
    },
    {
        title: "Kitchen Supervisor",
        company: "All Star Wings & Ribs Family Restaurant",
        year: "September 2011 - May 2017",
    },
    {
        title: "Co-Operative Education",
        company: "Sheraton Hotel",
        year: "February 2010 - June 2010",
    },
    {
        title: "Cable technician and installer",
        company: "Scotchy Enterprises",
        year: "2009 - 2011",
    },
    {
        title: "1st Cook",
        company: "Cedar Fair Entertainment Company: Canada's Wonderland",
        year: "2008 - 2013",
    },
    {
        title: "Cook & Server",
        company: "El Jacal Mexican Restaurant",
        year: "September 2006 - December 2010",
    },
    ];
    res.json(experience);
});

app.get("/getOverview", (req, res) => {
    const overview = {
        name: "Sergio Romero",
        contact: {
        cell: "647-268-8640",
        email: "SergioR8992@gmail.com",
    },
    skills: [
        "Motivated and eager to learn",
        "Great teamwork and leadership skills",
        "Well developed organization skills",
        "Bilingual: Spanish and English",
        "Smart Serve Certified",
        "Safety at height certified",
        "Lift training certified",
        "Specialist High Skills Major",
    ],
    };
    res.json(overview);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
