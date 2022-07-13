import IQueryFilters from "../../types/IQueryFilters";

const getFilters = (filters: IQueryFilters) => {

    if(!filters){
        return []
    }
    
    if(!Array.isArray(filters)){
        return filters.split(",")
    }
    
    return filters.filter(item => item !== "");
}

export default getFilters;