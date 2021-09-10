<?php 
/*
Plugin Name: React Block Type
Description: Give your readers a multiple choice question.
Version: 1.0
Author: Rosa
*/

if(!defined('ABSPATH')) exit;


class AreYouPayingAttention {
    function __construct() {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_enqueue_style( 'quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_enqueue_script( 'ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('ourplugin/react-block-type', 
        array(
            'editor_script' => 'ournewblocktype',
            'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }
    function theHTML($attributes) {
        // return '<h2>Today the sky is ' .esc_html($attributes['skyColor']).' and grass is '. esc_html($attributes['grassColor']) .'</h2>';
        ob_start(); ?>
         <h3>Today the sky is <?php echo esc_html($attributes['skyColor']); ?>, and grass is <?php echo esc_html($attributes['grassColor']); ?></h3>       
        <?php return ob_get_clean();

    }
}

$areYouPayingAttention = new AreYouPayingAttention();

?>