import '../../styles/global.css';
import { useState, useMemo, useEffect } from 'preact/hooks';
import { Photocard } from './Photocard.jsx'; 

export function PhotoGallery({ allImages }) {
  //hooks
  const [selectedTag, setSelectedTag] = useState('All');
  const [shuffledImages, setShuffledImages] = useState([]);

  const allTags = useMemo(() => {
    return ['All', ...new Set(allImages.flatMap(image => image.tags))];
  }, [allImages]);

  useEffect(() => {
    // First, filter the images based on the selected tag
    const filtered = selectedTag === 'All'
      ? allImages
      : allImages.filter(image => image.tags.includes(selectedTag));

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setShuffledImages(shuffled);

  }, [selectedTag, allImages]); 

  return (
    <>
      {/* Filter Buttons */}
      <div id="tag-filters" className="flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-6">
        <p class="text-sm ">CHOOSE A TAG:</p>
        <div class="flex-row flex-wrap justify-center items-center gap-2 mb-4 sm:mb-0">
          {allTags.map(tag => (
            <button
              className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div id="photo-grid" className="flex flex-row flex-wrap justify-evenly">
        {shuffledImages.map(image => (
          <Photocard key={image.id} photo={image} />
        ))}
      </div>
    </>
  );
}