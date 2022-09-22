const Tour = require("../models/TourModel")

exports.getToursService = async (filters, queries) => {
    console.log(queries)
    const tours = await Tour.find(filters)
        .select(queries.fields)
        .sort(queries.sortBy)
        .skip(queries.skip)
        .limit(queries.limit);

    const totalTours = await Tour.countDocuments(filters)
    const pageCount = await Math.ceil(parseInt(totalTours) / Number(queries.limit))
    console.log(totalTours, pageCount, queries.limit)
    return { totalTours, pageCount, tours };
}