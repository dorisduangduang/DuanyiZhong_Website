import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import photo1 from '../assets/images/photo1.png';
import photo2 from '../assets/images/photo2.png';
import photo3 from '../assets/images/photo3.png';

const projectImages = {
  "ai-digital-human": photo1,
  "ophthalmology-ai": photo2,
  "career-planning": photo3
};

const ProjectCard = ({ project, index }) => {
  const image = projectImages[project.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/project/${project.id}`} className="block overflow-hidden rounded-xl border border-slate-100 bg-white hover:border-accent/20 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5">
        <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-medium">
              {project.title}
            </div>
          )}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{project.category}</p>
              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">{project.title}</h3>
            </div>
            <div className="p-2 rounded-full border border-slate-100 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
