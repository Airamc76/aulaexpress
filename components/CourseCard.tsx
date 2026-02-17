
import React from 'react';
import { Star, Clock, User, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (slug: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl group cursor-pointer"
      onClick={() => onClick(course.slug)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
            {course.category}
          </span>
        </div>
        {(course.old_price || course.oldPrice) && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg animate-pulse">
              OFERTA
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center space-x-1 text-yellow-500 mb-2">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-bold text-slate-700">{course.rating}</span>
          <span className="text-xs text-slate-400">({course.students})</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {course.level}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            {(course.old_price || course.oldPrice) && (
              <span className="text-xs text-slate-400 line-through">${course.old_price || course.oldPrice}</span>
            )}
            <span className="text-xl font-bold text-indigo-600">${course.price}</span>
          </div>
          <button className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
