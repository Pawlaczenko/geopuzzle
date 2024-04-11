import { Document } from "mongoose";
import { Query } from "mongoose";

interface IAPIFeatures {
    query: Query<Document[], Document>
    queryString : any
}
class APIfeatures implements IAPIFeatures{
    query;
    queryString;
    excludeFields = ['page', 'sort', 'limit', 'fields', 'search', "searchKeys"];
    constructor(query: Query<Document[], Document>, queryString: any) {
      this.query = query;
      this.queryString = queryString;
    }

    
  
    filter() {
      const queryCopy = { ...this.queryString };
      const excludeFields = this.excludeFields;
      excludeFields.forEach((el) => delete queryCopy[el]);
  
      let queryString = JSON.stringify(queryCopy);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt|in|regex)\b/g,
        (match) => `$${match}`
      );
      this.query = this.query.find(JSON.parse(queryString));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
    search() {
      if (this.queryString.search && this.queryString.searchKeys) {
          const searchTerm = this.queryString.search;
          const searchKeys : string[] = this.queryString.searchKeys.split(",");
          const orConditions: { [key: string]: any }[] = [];
          searchKeys.forEach((key) => {
            const condition: { [key: string]: any } = {};  
            if (key.includes("[]")) { 
                const arrayKey: string = key.replace('[]', '');
                condition[arrayKey] = { $elemMatch:{ $regex: RegExp(searchTerm), $options: 'i'} };
            } else {
                condition[key] = { $regex: RegExp(searchTerm) , $options: 'i'};
            }
            orConditions.push(condition);
          });
          this.query = this.query.or(orConditions);
        }
  
      return this;
  }
  }
  
export default APIfeatures; 