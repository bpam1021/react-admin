import {
  USER_LIST_PAGE_LOADED,
  USER_LIST_PAGE_UNLOADED,
  USER_LIST_PAGE_REQUESTED,
  USER_VIEW_PAGE_LOADED,
  USER_VIEW_PAGE_UNLOADED,
  USER_CREATE,
  USER_UPDATE,
  USER_EDITOR_PAGE_LOADED,
  USER_EDITOR_PAGE_UNLOADED,
  USER_DELETE
} from "./constants";
import agent from "./agent";

export const onLoadRequestAction = () => {
  return {
    type: USER_LIST_PAGE_REQUESTED
  };
};

export const onLoadAction = props => {
  return {
    type: USER_LIST_PAGE_LOADED,
    payload: agent.list(props)
  };
};

export const onClickDeleteAction = id => {
  return {
    type: USER_DELETE,
    payload: agent.del(id)
  };
};

export const onUnloadAction = () => {
  return {
    type: USER_LIST_PAGE_UNLOADED
  };
};

export const onViewPageLoad = id => {
  return {
    type: USER_VIEW_PAGE_LOADED,
    payload: agent.get(id)
  };
};

export const onViewUnload = () => {
  return {
    type: USER_VIEW_PAGE_UNLOADED
  };
};

export const postUser = values => {
  if (values.id) {
    return { type: USER_UPDATE, payload: agent.update(values) };
  } else {
    return { type: USER_CREATE, payload: agent.create(values) };
  }
};

export const onEditorLoad = id => {
  return { type: USER_EDITOR_PAGE_LOADED, payload: agent.get(id) };
};

export const onEditorUnLoad = id => {
  return { type: USER_EDITOR_PAGE_UNLOADED };
};
