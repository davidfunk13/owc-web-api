const paginateItems = (data: [], page?: number) => {
    const pages = Math.ceil(data.length / 10);

    if (!page || page === 1) {
        return {
            page: 1,
            pages,
            data: data.slice(page * 10 - 10, page * 10),
        }
    }

    if (page > pages) {
        page = pages
    }

    return {
        page,
        pages,
        data: data.slice(page * 10 - 10, page * 10),
    }
}

export default paginateItems;