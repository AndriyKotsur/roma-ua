const SearchBox = (props) => (
    `<a href="/${props.type}${props.category ? '/' + props.category : ''}/${props.url}" class="search__results-item">
        <span class="search__results-title">${props.title}</span>
    </a>`)

export default SearchBox
