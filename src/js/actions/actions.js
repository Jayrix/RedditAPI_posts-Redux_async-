import fetch from 'cross-fetch';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectSubreddit = (subreddit) => {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export const invalidateSubreddit = (subreddit) => {
    return {
        type : INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export const requestPosts = (subreddit) => {
    return {
        type : REQUEST_POSTS,
        subreddit
    }
}

export const receivePosts = (subreddit, json) => {
    return {
        type : RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit){
    return function (dispatch) {
        dispatch(requestPosts(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(
                json => dispatch(receivePosts(subreddit, json))
            )
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit){
    return function (dispatch, getState) {
        if (shouldFetchPosts(getState(),subreddit)){
            return dispatch(fetchPosts(subreddit))
        } else {
            return Promise.resolve()
        }
    }
}



