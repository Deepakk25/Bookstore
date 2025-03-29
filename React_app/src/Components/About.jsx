import React from 'react';
import { useSelector } from 'react-redux';

const BooksOverview = () => {
  // Retrieve the search query from the Redux store
  const searchItem = useSelector((state) => state.search.query);

  // Function to filter content based on search query
  const filterContent = (text) => {
    return text.toLowerCase().includes(searchItem.toLowerCase());
  };

  return (
    <div className="books-overview">
      <h1>The Power of Books</h1>
      {/* Content section */}
      {filterContent("Books are more than just bound collections of paper and ink; they are gateways to other worlds, ideas, and experiences.") && (
        <section>
          <p>
            Books are more than just bound collections of paper and ink; they are gateways to other worlds, ideas, and experiences. Throughout history, books have served as vessels for knowledge, culture, and imagination, shaping societies and individuals alike.
          </p>
        </section>
      )}
      
      {filterContent("Books as Knowledge Keepers") && (
        <section>
          <h2>Books as Knowledge Keepers</h2>
          <p>
            From ancient manuscripts to modern textbooks, books have always been crucial in preserving and disseminating knowledge. They are repositories of human thought, capturing scientific discoveries, philosophical ideas, and historical events. For centuries, books have been the primary means by which knowledge is passed from one generation to the next. They educate, inform, and inspire, making complex ideas accessible and understandable.
          </p>
        </section>
      )}
      
      {filterContent("Books as Sources of Inspiration") && (
        <section>
          <h2>Books as Sources of Inspiration</h2>
          <p>
            Books have the remarkable ability to inspire and transform readers. Fictional stories, whether set in fantastical realms or grounded in reality, have the power to evoke emotions, challenge perceptions, and ignite creativity. Through the experiences of characters, readers can explore different perspectives and gain insights into the human condition. Inspirational biographies and self-help books provide motivation and practical advice, guiding readers on their personal journeys.
          </p>
        </section>
      )}
      
      {filterContent("Books and Personal Growth") && (
        <section>
          <h2>Books and Personal Growth</h2>
          <p>
            Reading is a deeply personal activity that can significantly impact individual growth. Engaging with books helps develop critical thinking skills, enhances empathy, and fosters a lifelong love of learning. The act of reading stimulates the mind, improves focus, and expands vocabulary. Books offer opportunities for reflection and self-discovery, encouraging readers to question and explore their beliefs and values.
          </p>
        </section>
      )}
      
      {filterContent("Books as Cultural Artifacts") && (
        <section>
          <h2>Books as Cultural Artifacts</h2>
          <p>
            Books are also important cultural artifacts that reflect the values, norms, and concerns of their times. Literary works capture the essence of different eras, providing insights into societal changes and historical contexts. Classic literature, for example, offers a window into the past, while contemporary works address current issues and trends. By reading diverse books, individuals gain a broader understanding of the world and its varied cultures.
          </p>
        </section>
      )}
      
      {filterContent("The Joy of Reading") && (
        <section>
          <h2>The Joy of Reading</h2>
          <p>
            Beyond their educational and cultural value, books bring joy and comfort to readers. Whether curled up with a novel on a rainy day or exploring new ideas in a thought-provoking non-fiction book, reading is a source of pleasure and relaxation. Bookstores and libraries, with their rich collections and cozy atmospheres, are sanctuaries for book lovers, offering a space to escape and immerse themselves in the written word.
          </p>
        </section>
      )}
      
      {filterContent("The Future of Books") && (
        <section>
          <h2>The Future of Books</h2>
          <p>
            As technology evolves, the format of books continues to change. E-books and audiobooks offer new ways to access and enjoy literature, making books more accessible than ever before. However, despite these advancements, the essence of books remains unchanged. They continue to be cherished for their ability to educate, inspire, and entertain.
          </p>
        </section>
      )}
      
      {filterContent("In conclusion, books are indispensable to the human experience.") && (
        <section>
          <p>
            In conclusion, books are indispensable to the human experience. They are not merely sources of information, but also powerful tools for personal and cultural enrichment. As we continue to explore and embrace new formats and technologies, the timeless appeal of books endures, ensuring that they will remain a vital part of our lives for generations to come.
          </p>
        </section>
      )}
    </div>
  );
};

export default BooksOverview;
