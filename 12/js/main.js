import {renderThumbnails} from './thumbnail.js';
import './form-edit-photo.js';
import {getData} from './api.js';
import {setFormEditPhotoSubmit} from './form-edit-photo.js';
import {closeUserModal} from './full-size-photo.js';

const TOPIC_COUNT = 25;
getData((topics) => {
  renderThumbnails(topics.slice(0, TOPIC_COUNT));
});

setFormEditPhotoSubmit(closeUserModal);
