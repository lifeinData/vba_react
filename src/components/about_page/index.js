import React from 'react';

const aboutPage = (props) => {
    return (
        <div id="about-page-layout">
            <div id="about-menu">
                <div className="menu-choice-header-h1 about-page-choice">
                    <p>What</p>                    
                    <p>Why</p>
                    <p>How</p>
                    <p>Who</p>
                </div>
            </div>

            <div id="about-sections">
                <div className="menu-choice-header-h1">
                    <div className="about-page-section">
                        What is this?
                        - A place where you can learn and explore some VBA templates that I've created!
                        - A place where you can dissect your spiced up VBA code so you can explain and dissemnate your VBA code to others!

                        What are the core features?
                        - Automatic creation of a table of contents for your Subroutines and Functions so you can jump right to it in your code 
                            - Unfortunately a feature that is available in our beautiful 1995 VBA IDE

                        - Display your descriptions of your code in a nicely laid out web page for your VBA code via parsing XL_MARKUP tags

                        - Directly add column names to your VBA code

                        What do you mean by "spiced up VBA"?
                        - Add some special XL_MARKUP tags to your VBA Code
                        - Head over to Build Your Own Vault
                        - Copy and paste your spiced up VBA Code and link your friends and colleagues
                        
                        Why use this over github?
                        - Github is amazing and indeed there are many awesome repos for VBA templates/code. However, Github does not allow you to spice up your VBA code with
                        XL_MARKUP tags and display them in the Built Your Own Vault app!




                    </div>
                    <div className="about-page-section"></div>
                    <div className="about-page-section"></div>
                    <div className="about-page-section"></div>
                </div>
            </div>
        </div>
    )
}

export default aboutPage;