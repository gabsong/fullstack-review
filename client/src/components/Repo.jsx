import React from 'react';

const Repo = (props) => (
  <div>
    <div className="repo-name">
      <div>
        <a href={props.repo.repo_url}>{props.repo.repo_name}</a>
        <span> {String.fromCodePoint(0x2B50)}{props.repo.stargazers_count}</span>
      </div>
    </div>
  </div>
)

export default Repo;