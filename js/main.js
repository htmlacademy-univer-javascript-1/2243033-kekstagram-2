import {createSimilarTopics} from './data.js';
import {renderThumbnails} from './thumbnail.js';
import './form-edit-photo.js';
import './scale-photo.js';
const TOPIC_COUNT = 25;
const similarTopics = createSimilarTopics(TOPIC_COUNT);

renderThumbnails(similarTopics);
