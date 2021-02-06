import * as types from './actionTypes';
import api from '../api';

// TODO - make a utility for logging?

export const fetchAllItems = () => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_ALL_ITEMS });

        return api.getAllItems()
            .then(resp => {
                const { books } = resp.data;
                console.log("getAllItems: resp");
                console.log(books);
                dispatch({
                    type: types.SET_ALL_ITEMS,
                    books,
                });
            })
            .catch(err => {
                console.error(`ERROR in 'getAllItems': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const fetchSingleItem = (itemIsbn) => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_ITEM });

        return api.getItemByIsbn(itemIsbn)
            .then(resp => {
                console.log("getItemByIsbn: resp");
                console.log(resp);
                if (resp.data.success) {
                    const { item } = resp.data;
                    dispatch({
                        type: types.GET_SINGLE_ITEM,
                        item,
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'fetchSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const insertSingleItem = item => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_ITEM });

        return api.insertItem(item)
            .then(resp => {
                console.log("insertItem: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newItem = JSON.parse(resp.config.data);
                    dispatch({
                        type: types.SET_SINGLE_ITEM,
                        item: {
                            isbn: resp.data.isbn,
                            ...newItem
                        }
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'insertSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const updateSingleItem = item => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_ITEM });

        return api.updateItemByIsbn(item.isbn, item)
            .then(resp => {
                console.log("updateItem: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newItem = JSON.parse(resp.config.data);
                    dispatch({
                        type: types.UPDATE_SINGLE_ITEM,
                        item: {
                            isbn: resp.data.isbn,
                            ...newItem
                        }
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'updateSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const deleteSingleItem = itemIsbn => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_ITEM });

        return api.deleteItemByIsbn(itemIsbn)
            .then(resp => {
                console.log("deleteItemByIsbn: resp");
                console.log(resp);
                dispatch({
                    type: types.RELOAD_ITEMS
                });
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'deleteSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};