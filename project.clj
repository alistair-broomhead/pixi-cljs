(defproject culture-cljs "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.293"
                  :exclusions [org.apache.ant/ant]]]
  :plugins [[lein-cljsbuild "1.1.5"]]
  :hooks [leiningen.cljsbuild]
  :cljsbuild {
    :builds {:main {
            :source-paths ["src-cljs"]
            :incremental true
            :compiler {:output-to "resources/public/js/main.js"
                       :output-dir "resources/public/js/"
                       :warnings true
                       :foreign-libs []
                       :externs ["lib/pixi.min.js" 
                                 "lib/engine.js"]
                       :optimizations :none
                       :elide-asserts false
                       :pretty-print true
                       :print-input-delimiter true
                       :source-map true
                       :output-wrapper false
                       :libs ["closure/library/third_party/closure"]
                       :language-in :ecmascript5
                       :language-out :ecmascript3}}}})
