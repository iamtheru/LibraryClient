import { Review } from "./review";

export interface BookDetails {
	id: number;
	title: string;
	author: string;
	genre: string;
	cover: string; 
	content: string;
	rating: number;
	reviews : Review[];
	reviewsNumber: number;
  }