import QueryFilters from "../../types/QueryFilters";

const getFilters = (filters: QueryFilters) => {

    if(!filters){
        return []
    }
    
    if(!Array.isArray(filters)){
        return filters.split(",")
    }
    
    return filters.filter(item => item !== "");
}

export default getFilters;