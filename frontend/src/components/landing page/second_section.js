import React from "react";
import "./landing_page.css";

class Categories {
    constructor(name, descr, imgClass) {
        this.catName = name;
        this.descr = descr;
        this.imgClass = "cat-image " + imgClass;
    }
}

class SecondSection extends React.Component {
    categories = [
        new Categories(
            "Photography",
            "A professional photographer is likely to take photographs for a session and image.",
            "photography"
        ),
        new Categories(
            "Music",
            "A musician is a person who plays a musical instrument or is musically talented.",
            "music"
        ),
        new Categories(
            "Lyricist",
            "A lyricist or lyrist is a person who writes lyrics—words for songs—as opposed to a composer",
            "lyrist"
        ),
        new Categories(
            "Animation",
            "A lyricist or lyrist is a person who writes lyrics—words for songs—as opposed to a composer",
            "animation"
        ),
        new Categories(
            "Director",
            "A lyricist or lyrist is a person who writes lyrics—words for songs—as opposed to a composer",
            "animation"
        ),
        new Categories(
            "Choreographer",
            "A lyricist or lyrist is a person who writes lyrics—words for songs—as opposed to a composer",
            "animation"
        ),
        new Categories(
            "Cinematographer",
            "A lyricist or lyrist is a person who writes lyrics—words for songs—as opposed to a composer",
            "animation"
        )
    ];

    categoryBlocks = blocks => {
        let catBlocks = [];

        for (let index = 0; index < blocks.length; index++) {
            let block = blocks[index];
            catBlocks.push(
                <div className="cat-block" key={index}>
                    <div className={block.imgClass}>
                        <div></div>
                    </div>
                    <div className="cat-descr">
                        <h3>{block.catName}</h3>
                        <p>{block.descr}</p>
                    </div>
                </div>
            );
        }

        return catBlocks;
    };

    render() {
        return (
            <div className="section secondSection row" id="secondSection">
                <div className="col-12">
                    <h2>SEE POSTS RELATED TO...</h2>
                    <div className="categories">
                        {this.categoryBlocks(this.categories)}
                    </div>
                </div>
            </div>
        );
    }
}

export default SecondSection;
