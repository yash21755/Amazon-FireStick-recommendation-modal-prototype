import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import serieCSVfile from "../data/series_database.csv?url";
import Navbar from "../components/PrimeNavBar.jsx";
import MediaModalDetails from "../components/MediaModalDetails.jsx";

const AllSeries = () => {
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        Papa.parse(serieCSVfile, {
            download: true,
            header: true,
            complete: (results) => {
                const raw = results.data;
                const mapped = raw
                    .filter(
                        (row) =>
                            row["Image-src"]?.startsWith("http") &&
                            row.Name &&
                            row.Year
                    )
                    .map((row, idx) => {
                        const title = row.Name.replace(/^\d+\.\s*/, "").trim();
                        return {
                            id: `${title}-${row.Year.trim() || idx}`,
                            title,
                            img: row["Image-src"].trim().replace(/_V1_.*\.jpg$/, "_V1_.jpg"),
                            ["Image-src"]: row["Image-src"],
                            rating: parseFloat(row.Rating),
                            Year: row.Year,
                            Episodes: row.Episodes,
                            Type: row.Type,
                            description: row.Description
                        };
                    });


                // Remove duplicates
                const seen = new Set();
                const uniqueSeries = mapped.filter((m) => {
                    if (seen.has(m.id)) return false;
                    seen.add(m.id);
                    return true;
                });

                setSeries(uniqueSeries);
            },
        });
    }, []);

    // Filter series by search term (case-insensitive)
    const filtered = search
        ? series.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
        : series;

    return (
        <>
            <Navbar onSearch={setSearch} />
            <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10 pt-24">
                <h2 className="text-3xl font-bold mb-6 px-12">All Series</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-12">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 cursor-pointer"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="p-3">
                                <div className="font-semibold text-lg truncate">{item.title}</div>
                                <div className="text-yellow-400 text-sm">
                                    {item.rating ? `${item.rating} IMDb` : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedItem && (
                <MediaModalDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </>
    );
};

export default AllSeries;
