let assign = require('object-assign');

/**
 * Infinite scroll mixin.
 * @type {Object}
 */
let InfiniteScrollPageMixin = {
    /**
     * Initial state for a scrolling page.
     * @returns {*} the initial state
     */
    getInitialState() {
        return assign({
                hasMoreData: false,
                currentPage: 1
            },
            this.getScrollState()
        );
    },

    /**
     * current state of the scrolling list.
     * @returns {*} the scroll state
     */
    getScrollState() {
        if (this.store) {
            let data = this.store.get();
            let hasMoreData = data.pageInfos && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages;
            let totalRecords = data.pageInfos ? data.pageInfos.totalRecords : undefined;
            return {
                list: data.list || [],
                hasMoreData,
                totalRecords,
                isLoading: false
            };
        } else {
            return {};
        }
    }
};

module.exports = {mixin: InfiniteScrollPageMixin};
